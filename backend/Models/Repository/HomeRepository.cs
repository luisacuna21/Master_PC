using System.Globalization;
using backend.Models.HomeUtilities;
using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository
{
    public class HomeRepository : IHomeRepository
    {
        private readonly MasterPCContext _context;

        public HomeRepository(MasterPCContext context)
        {
            _context = context;
        }

        // select ProductID, SUM(Quantity), SUM(Quantity)/COUNT(Order_DetailID) from Sale.OrderDetails group by ProductID order by ProductID

        // select od.OrderID, SUM(od.Quantity)/(Select COUNT(odd.Order_DetailID) from Sale.OrderDetails as odd WHERE odd.ProductID = od.ProductID) from Sale.OrderDetails as od where ProductID = 1 group by OrderID, ProductID

        public async Task<Home> GetHome()
        {
            var ordersCount = await _context.Orders.CountAsync();
            var income = await _context.OrderDetails.SumAsync(od => od.UnitPrice * od.Quantity);

            // .Join(_context.Products, od => od.ProductID, p => p.ProductId, (od, p) => p)
            // .ToListAsync()

            var home = new Home
            {
                OrdersCount = ordersCount,
                ProductsCount = await _context.Products.CountAsync(),
                CustomersCount = await _context.Customers.CountAsync(),
                Income = income,
                IncomeStringFormat = income.ToString("C2", CultureInfo.CreateSpecificCulture("en-US")),
                ProductsPerOrderAverage =
                                            Math.Round(await _context.OrderDetails
                                            .GroupBy(od => od.OrderId)
                                            .Select(od => new { OrderID = od.Key, Quantity = od.Sum(o => o.Quantity), Count = od.Count() })
                                            .AverageAsync(od => od.Quantity / od.Count), 2),
                BestSellers = await _context.OrderDetails.GroupBy(od => od.ProductId)
                                            .Select(od => new { ProductID = od.Key, Quantity = od.Sum(o => o.Quantity) })
                                            .OrderByDescending(od => od.Quantity)
                                            .Take(3)
                                            .Join(_context.Products, od => od.ProductID, p => p.ProductId, (od, p) => new BestSeller { Product = p, Quantity = od.Quantity })
                                            .ToListAsync()
            };
            home.BestSellers.ToList().ForEach(bs => {
                bs.Product.Brand = _context.Brands.FirstOrDefault(b => b.BrandId == bs.Product.BrandId);
                bs.Product.Category = _context.ProductCategories.FirstOrDefault(c => c.ProductCategoryId == bs.Product.CategoryId);
            });

            return home;
        }
    }
}
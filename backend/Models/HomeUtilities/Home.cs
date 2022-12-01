namespace backend.Models.HomeUtilities;
public class Home
{
    public int OrdersCount { get; set; }
    public int ProductsCount { get; set; }
    public int CustomersCount { get; set; }
    public decimal Income { get; set; }
    public string IncomeStringFormat { get; set; }
    public double ProductsPerOrderAverage { get; set; }
    public IEnumerable<BestSeller> BestSellers { get; set; }
}
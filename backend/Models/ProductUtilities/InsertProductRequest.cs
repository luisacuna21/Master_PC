namespace backend.Models.ProductUtilities;
public class InsertProductRequest
{
    public string ProductName { get; set; }
    public string ProductShortName { get; set; }
    public int BrandId { get; set; }
    public int CategoryId { get; set; }
    public decimal? UnitPrice { get; set; }
    public short? UnitsInStock { get; set; }
    public short? UnitsOnOrder { get; set; }
    public short? ReorderLevel { get; set; }
    public bool Discontinued { get; set; }
    public string ProductDescription { get; set; }
    public IEnumerable<InsertProductPhotoRequest> ProductPhotos { get; set; }
}

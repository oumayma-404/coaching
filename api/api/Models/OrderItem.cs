namespace api.Models;

public class OrderItem
{
    public int Id { get; set; }

    public int OrderId { get; set; }       // <-- Add this
    public Order Order { get; set; }       // <-- And this

    public int ProductId { get; set; }
    public Product Product { get; set; }

    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

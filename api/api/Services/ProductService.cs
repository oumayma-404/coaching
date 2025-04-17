using api.Models;
using api.Repositories;

namespace api.Services;


// Services/ProductService.cs
public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public Task AddProductAsync(Product product)
    {
        return _productRepository.AddAsync(product);
    }

    public Task DeleteProductAsync(int id)
    {
        return _productRepository.DeleteAsync(id);
    }

    public Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        return _productRepository.GetAllAsync();
    }

    public Task<IEnumerable<Product>> GetBestSellersAsync()
    {
        return _productRepository.GetBestSellersAsync();
    }

    public Task<Product> GetProductByIdAsync(int id)
    {
        return _productRepository.GetByIdAsync(id);
    }

    public Task<IEnumerable<Product>> GetProductsByCategoryAsync(string category)
    {
        return _productRepository.GetProductsByCategoryAsync(category);
    }

    public Task<IEnumerable<Product>> SearchProductsAsync(string searchTerm)
    {
        return _productRepository.SearchProductsAsync(searchTerm);
    }

    public Task UpdateProductAsync(Product product)
    {
        product.UpdatedAt = DateTime.UtcNow;
        return _productRepository.UpdateAsync(product);
    }
}
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;
    private readonly IWebHostEnvironment _hostEnvironment;

    public ProductsController(
        IProductService productService,
        ILogger<ProductsController> logger,
        IWebHostEnvironment hostEnvironment)
    {
        _productService = productService;
        _logger = logger;
        _hostEnvironment = hostEnvironment;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
        [FromQuery] string? category = null,
        [FromQuery] string? search = null,
        [FromQuery] bool? bestSellers = null,
        [FromQuery] string? sort = "featured",
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            IEnumerable<Product> products = category != null
                ? await _productService.GetProductsByCategoryAsync(category)
                : search != null
                    ? await _productService.SearchProductsAsync(search)
                    : bestSellers == true
                        ? await _productService.GetBestSellersAsync()
                        : await _productService.GetAllProductsAsync();

            products = sort?.ToLower() switch
            {
                "price-low" => products.OrderBy(p => p.Price),
                "price-high" => products.OrderByDescending(p => p.Price),
                "rating" => products.OrderByDescending(p => p.Rating),
                _ => products.OrderByDescending(p => p.IsBestSeller)
                             .ThenByDescending(p => p.Rating),
            };

            var totalCount = products.Count();
            var pagedProducts = products
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            Response.Headers.Add("X-Total-Count", totalCount.ToString());
            Response.Headers.Add("X-Page", page.ToString());
            Response.Headers.Add("X-Page-Size", pageSize.ToString());

            return Ok(pagedProducts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting products");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        try
        {
            var product = await _productService.GetProductByIdAsync(id);
            return product == null ? NotFound() : Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting product with ID {id}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromForm] ProductCreateDto productDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string? imageUrl = null;

            if (productDto.Image != null)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                Directory.CreateDirectory(uploadsFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(productDto.Image.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await productDto.Image.CopyToAsync(stream);

                imageUrl = $"/uploads/{fileName}";
            }

            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                ImageUrl = imageUrl,
                Category = productDto.Category,
                Rating = productDto.Rating,
                Reviews = productDto.Reviews,
                IsBestSeller = productDto.IsBestSeller
            };

            await _productService.AddProductAsync(product);

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductUpdateDto productDto)
    {
        try
        {
            if (id != productDto.Id)
                return BadRequest("ID mismatch");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();

            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.Price = productDto.Price;
            product.ImageUrl = productDto.ImageUrl;
            product.Category = productDto.Category;
            product.Rating = productDto.Rating;
            product.Reviews = productDto.Reviews;
            product.IsBestSeller = productDto.IsBestSeller;
            product.UpdatedAt = DateTime.UtcNow;

            await _productService.UpdateProductAsync(product);

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating product with ID {id}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        try
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
                return NotFound();

            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deleting product with ID {id}");
            return StatusCode(500, "Internal server error");
        }
    }
}

// DTOs
public class ProductCreateDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
    public double Rating { get; set; }
    public int Reviews { get; set; }
    public bool IsBestSeller { get; set; }
    public IFormFile Image { get; set; }
}

public class ProductUpdateDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string ImageUrl { get; set; }
    public string Category { get; set; }
    public double Rating { get; set; }
    public int Reviews { get; set; }
    public bool IsBestSeller { get; set; }
}

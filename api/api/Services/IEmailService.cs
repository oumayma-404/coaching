using api.Models;

namespace api.Services;

public interface IEmailService
{
    Task SendOrderConfirmationAsync(string email, Order order);
    Task SendOrderStatusUpdateAsync(string email, Order order);
}
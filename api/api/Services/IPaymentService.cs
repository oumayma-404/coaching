using api.Models;

namespace api.Services;

public interface IPaymentService
{
    Task<string> CreatePaymentSessionAsync(PaymeeRequest request);
}
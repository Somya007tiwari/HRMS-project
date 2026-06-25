using HrmsFeature.Domain;
using HRMS.Core.Postgres.Common;

namespace HrmsFeature.Application.Repository
{
    public interface IHrmsRepository
    {
        Task<List<T>> GetAllAsync<T>() where T : BaseEntity;
        Task<T?> GetByIdAsync<T>(string id) where T : BaseEntity;
        Task<T> AddAsync<T>(T entity) where T : BaseEntity;
        Task<T> UpdateAsync<T>(string id, T entity) where T : BaseEntity;
        Task DeleteAsync<T>(string id) where T : BaseEntity;
    }
}

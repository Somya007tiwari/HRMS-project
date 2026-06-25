using HrmsFeature.Domain;
using HrmsFeature.Application.Repository;
using HRMS.Core.Postgres.Data;
using HRMS.Core.Postgres.Interfaces;
using HRMS.Core.Postgres.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace HrmsFeature.Infrastructure
{
    public class HrmsRepository : IHrmsRepository
    {
        private readonly PostgresDbContext _context;

        public HrmsRepository(PostgresDbContext context)
        {
            _context = context;
        }

        public async Task<List<T>> GetAllAsync<T>() where T : BaseEntity
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T?> GetByIdAsync<T>(string id) where T : BaseEntity
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> AddAsync<T>(T entity) where T : BaseEntity
        {
            if (string.IsNullOrEmpty(entity.Id))
            {
                entity.Id = Guid.NewGuid().ToString();
            }
            if (entity.CreatedOn == null)
            {
                entity.CreatedOn = DateTime.UtcNow;
            }
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> UpdateAsync<T>(string id, T entity) where T : BaseEntity
        {
            var existing = await _context.Set<T>().FindAsync(id);
            if (existing == null)
            {
                throw new KeyNotFoundException($"Entity of type {typeof(T).Name} with ID {id} not found.");
            }

            entity.Id = id;
            entity.ModifiedOn = DateTime.UtcNow;
            _context.Entry(existing).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task DeleteAsync<T>(string id) where T : BaseEntity
        {
            var existing = await _context.Set<T>().FindAsync(id);
            if (existing != null)
            {
                _context.Set<T>().Remove(existing);
                await _context.SaveChangesAsync();
            }
        }
    }

    public class HrmsEntityConfigurator : IPostgresEntityConfigurator
    {
        public void Configure(ModelBuilder modelBuilder)
        {
            ConfigureEntity<OnboardingTask>(modelBuilder, "OnboardingTask");
            ConfigureEntity<AttendanceRecord>(modelBuilder, "AttendanceRecord");
            ConfigureEntity<LeaveRequest>(modelBuilder, "LeaveRequest");
            ConfigureEntity<LeaveBalance>(modelBuilder, "LeaveBalance");
            ConfigureEntity<ExpenseClaim>(modelBuilder, "ExpenseClaim");
            ConfigureEntity<Goal>(modelBuilder, "Goal");
            ConfigureEntity<ContributionItem>(modelBuilder, "ContributionItem");
            ConfigureEntity<TrainingModule>(modelBuilder, "TrainingModule");
            ConfigureEntity<JobPosting>(modelBuilder, "JobPosting");
            ConfigureEntity<Candidate>(modelBuilder, "Candidate");
            ConfigureEntity<Recognition>(modelBuilder, "Recognition");
            ConfigureEntity<Announcement>(modelBuilder, "Announcement");
        }

        private void ConfigureEntity<T>(ModelBuilder modelBuilder, string tableName) where T : BaseEntity
        {
            modelBuilder.Entity<T>(entity =>
            {
                entity.ToTable(tableName);
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasMaxLength(128);
                entity.Property(e => e.DocumentType).IsRequired().HasMaxLength(128);
                entity.HasIndex(e => e.DocumentType);
            });
        }
    }

    public static class ConfigureServiceExtension
    {
        public static IServiceCollection AddHrmsDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.TryAddEnumerable(ServiceDescriptor.Scoped<IPostgresEntityConfigurator, HrmsEntityConfigurator>());
            services.AddScoped<IHrmsRepository, HrmsRepository>();
            return services;
        }
    }
}

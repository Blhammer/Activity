using Microsoft.EntityFrameworkCore;

namespace Application.Core
{
    // Generic parameter - <T> and
    // we derive from the List class
    // that we get from the framework

    public class PagedList<T> : List<T>
    {
        public PagedList(
            IEnumerable<T> items,
            int count, 
            int pageNumber, 
            int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
            TotalCount = count;

            // Add items we get passed in
            // as a parameter into the class
            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public static async Task<PagedList<T>> CreateAsync(
            IQueryable<T> source, 
            int pageNumber,
            int pageSize)
        {
            var count = await source.CountAsync();

            var items = await source
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}

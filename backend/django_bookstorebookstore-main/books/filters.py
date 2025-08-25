import django_filters
from .models import Book, Category, Author
from decimal import Decimal

class BookFilter(django_filters.FilterSet):
    # Price filters
    list_price__gte = django_filters.NumberFilter(field_name='list_price', lookup_expr='gte')
    list_price__lte = django_filters.NumberFilter(field_name='list_price', lookup_expr='lte')
    list_price__lt = django_filters.NumberFilter(field_name='list_price', lookup_expr='lt')
    list_price__gt = django_filters.NumberFilter(field_name='list_price', lookup_expr='gt')
    
    # Category filters
    categories = django_filters.CharFilter(method='filter_categories')
    category = django_filters.NumberFilter(field_name='categories__id')
    
    # Author filters  
    authors = django_filters.CharFilter(method='filter_authors')
    author = django_filters.NumberFilter(field_name='authors__id')
    
    # Search
    q = django_filters.CharFilter(method='search_books')
    search = django_filters.CharFilter(method='search_books')
    
    # Rating filter
    rating__gte = django_filters.NumberFilter(field_name='rating_average', lookup_expr='gte')
    
    class Meta:
        model = Book
        fields = [
            'is_featured', 'is_active',
            'list_price__gte', 'list_price__lte', 'list_price__lt', 'list_price__gt',
            'categories', 'category', 'authors', 'author',
            'q', 'search', 'rating__gte'
        ]
    
    def filter_categories(self, queryset, name, value):
        """Filter books by multiple categories (comma-separated IDs)"""
        if not value:
            return queryset
        
        try:
            category_ids = [int(id.strip()) for id in value.split(',') if id.strip()]
            if category_ids:
                return queryset.filter(categories__id__in=category_ids).distinct()
        except (ValueError, TypeError):
            pass
        
        return queryset
    
    def filter_authors(self, queryset, name, value):
        """Filter books by multiple authors (comma-separated IDs)"""
        if not value:
            return queryset
        
        try:
            author_ids = [int(id.strip()) for id in value.split(',') if id.strip()]
            if author_ids:
                return queryset.filter(authors__id__in=author_ids).distinct()
        except (ValueError, TypeError):
            pass
        
        return queryset
    
    def search_books(self, queryset, name, value):
        """Search books by title, description, or author name"""
        if not value:
            return queryset
        
        from django.db.models import Q
        return queryset.filter(
            Q(title__icontains=value) |
            Q(description__icontains=value) |
            Q(short_description__icontains=value) |
            Q(authors__name__icontains=value)
        ).distinct()

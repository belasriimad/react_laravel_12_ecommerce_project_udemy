<?php

namespace App\Http\Controllers\Api;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Get all the products
     */
    public function index()
    {
        return ProductResource::collection(
            Product::with(['colors','sizes','reviews'])->latest()->get())
            ->additional([
                'colors' => Color::has('products')->get(),
                'sizes' => Size::has('products')->get(),
            ]);
    }

    /**
     * Get product by slug
     */
    public function show(Product $product)
    {
        if(!$product) {
            abort(404);
        }
        return ProductResource::make(
            $product->load(['colors','sizes','reviews']));
    }

    /**
     * Filter products by color
     */
    public function filterProductsByColor(Color $color)
    {
        return ProductResource::collection(
            $color->products()->with(['colors','sizes','reviews'])
            ->latest()->get())
            ->additional([
                'colors' => Color::has('products')->get(),
                'sizes' => Size::has('products')->get(),
            ]);
    }

    /**
     * Filter products by size
     */
    public function filterProductsBySize(Size $size)
    {
        return ProductResource::collection(
            $size->products()->with(['colors','sizes','reviews'])
            ->latest()->get())
            ->additional([
                'colors' => Color::has('products')->get(),
                'sizes' => Size::has('products')->get(),
            ]);
    }

    /**
     * Search for products by term
     */
    public function findProductsByTerm($searchTerm)
    {
        return ProductResource::collection(
            Product::where('name', 'LIKE', '%'.$searchTerm.'%')
            ->with(['colors','sizes','reviews'])
            ->latest()->get())
            ->additional([
                'colors' => Color::has('products')->get(),
                'sizes' => Size::has('products')->get(),
            ]);
    }
}

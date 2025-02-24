@extends('admin.layouts.app')

@section('title')
    Products
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <h3 class="mt-2">Products ({{$products->count()}})</h3>
                        <a href="{{route('admin.products.create')}}" class="btn btn-sm btn-primary">
                            <i class="fas fa-plus"></i>
                        </a>
                    </div>
                    <hr>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Colors</th>
                                    <th scope="col">Sizes</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Images</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($products as $key => $product)
                                    <tr>
                                        <th scope="row">{{$key += 1}}</th>
                                        <td>{{$product->name}}</td>
                                        <td>
                                            @foreach ($product->colors as $color)
                                                <span class="badge bg-light text-dark">
                                                    {{ $color->name }}
                                                </span>
                                            @endforeach
                                        </td>
                                        <td>
                                            @foreach ($product->sizes as $size)
                                                <span class="badge bg-light text-dark">
                                                    {{ $size->name }}
                                                </span>
                                            @endforeach
                                        </td>
                                        <td>{{$product->qty}}</td>
                                        <td>{{$product->price}}</td>
                                        <td>
                                            <div class="d-flex flex-column">
                                                <img src="{{asset($product->thumbnail)}}" 
                                                    alt="{{$product->name}}" 
                                                    class="img-fluid rounded mb-1"
                                                    width="30"
                                                    height="30">
                                                @if($product->first_image)
                                                    <img src="{{asset($product->first_image)}}" 
                                                        alt="{{$product->name}}" 
                                                        class="img-fluid rounded mb-1"
                                                        width="30"
                                                        height="30">
                                                @endif
                                                @if($product->second_image)
                                                    <img src="{{asset($product->second_image)}}" 
                                                        alt="{{$product->name}}" 
                                                        class="img-fluid rounded mb-1"
                                                        width="30"
                                                        height="30">
                                                @endif
                                                @if($product->third_image)
                                                    <img src="{{asset($product->third_image)}}" 
                                                        alt="{{$product->name}}" 
                                                        class="img-fluid rounded"
                                                        width="30"
                                                        height="30">
                                                @endif
                                            </div>
                                        </td>
                                        <td>
                                            @if ($product->status)
                                                <span class="badge bg-success p-2">
                                                    In Stock
                                                </span>
                                            @else
                                                <span class="badge bg-danger p-2">
                                                    Out of Stock
                                                </span>
                                            @endif
                                        </td>
                                        <td class="d-flex">
                                            <a href="{{route('admin.products.edit', $product->slug)}}" class="btn btn-sm btn-warning">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <a href="#" onclick="deleteItem({{$product->id}})" class="btn btn-sm btn-danger mx-1">
                                                <i class="fas fa-trash"></i>
                                            </a>
                                            <form id="{{$product->id}}" action="{{route('admin.products.destroy',$product->slug)}}" method="post">
                                                @csrf
                                                @method('DELETE')
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
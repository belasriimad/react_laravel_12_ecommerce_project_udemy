@extends('admin.layouts.app')

@section('title')
    Orders
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <h3 class="mt-2">Orders ({{$orders->count()}})</h3>
                    </div>
                    <hr>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Product Price</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Coupon</th>
                                    <th scope="col">By</th>
                                    <th scope="col">Done</th>
                                    <th scope="col">Delivered</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($orders as $key => $order)
                                    <tr>
                                        <td scope="col">{{$key += 1}}</td>
                                        <td scope="col">
                                            <div class="d-flex flex-column">
                                                @foreach ($order->products as $product)
                                                    {{ $product->name }}
                                                @endforeach
                                            </div>
                                        </td>
                                        <td scope="col">
                                            <div class="d-flex flex-column">
                                                @foreach ($order->products as $product)
                                                    {{ $product->price }}
                                                @endforeach
                                            </div>
                                        </td>
                                        <td scope="col">
                                            <div class="d-flex flex-column">
                                                {{ $order->qty }}
                                            </div>
                                        </td>
                                        <td scope="col">
                                            {{ $order->total }}
                                        </td>
                                        <td>
                                            @if ($order->coupon()->exists())
                                                <span class="badge bg-success">
                                                    {{ $order->coupon->name }}
                                                </span>
                                            @else 
                                                <span class="badge bg-danger">
                                                    N/A
                                                </span>
                                            @endif
                                        </td>
                                        <td scope="col">
                                            {{ $order->user->name }}
                                        </td>
                                        <td scope="col">
                                            {{ $order->created_at }}
                                        </td>
                                        <td scope="col">
                                            @if ($order->delivered_at)
                                                <span class="badge bg-success">
                                                    {{ \Carbon\Carbon::parse($order->delivered_at)->diffForHumans() }}
                                                </span>
                                            @else 
                                                <a href="{{route('admin.orders.update',$order->id)}}">
                                                    <i class="fas fa-pencil mx-2"></i>
                                                </a>  
                                            @endif
                                        </td>
                                        <td>
                                            <a href="#" onclick="deleteItem({{$order->id}})" class="btn btn-sm btn-danger">
                                                <i class="fas fa-trash"></i>
                                            </a>
                                            <form id="{{$order->id}}" action="{{route('admin.orders.delete',$order->id)}}" method="post">
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
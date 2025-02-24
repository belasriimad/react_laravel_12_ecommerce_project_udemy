@extends('admin.layouts.app')

@section('title')
    Reviews
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <div class="col-md-9">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <h3 class="mt-2">Reviews ({{$reviews->count()}})</h3>
                    </div>
                    <hr>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Body</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Approved</th>
                                    <th scope="col">By</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Created</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($reviews as $key => $review)
                                    <tr>
                                        <td scope="col">{{$key += 1}}</td>
                                        <td scope="col">{{$review->title}}</td>
                                        <td scope="col">{{$review->body}}</td>
                                        <td scope="col">{{$review->rating}}</td>
                                        <td scope="col">
                                            @if ($review->approved)
                                                <span class="badge bg-success">
                                                    Yes
                                                </span>
                                            @else 
                                                <span class="badge bg-danger">
                                                    No
                                                </span>
                                            @endif
                                        </td>
                                        <td scope="col">{{$review->user->name}}</td>
                                        <td scope="col">
                                            <img src="{{asset($review->product->thumbnail)}}" 
                                                class="rounded" width="60" height="60" alt="{{$review->product->name}}">
                                        </td>
                                        <td scope="col">{{$review->created_at}}</td>
                                        <td>
                                            @if ($review->approved)
                                                <a href="{{route('admin.reviews.update', ['review' => $review->id, 'status' => 0])}}" class="btn btn-sm btn-warning">
                                                    <i class="fas fa-eye-slash"></i>
                                                </a>
                                            @else 
                                                <a href="{{route('admin.reviews.update', ['review' => $review->id, 'status' => 1])}}" class="btn btn-sm btn-success">
                                                    <i class="fas fa-check-double"></i>
                                                </a>
                                            @endif
                                            <a href="#" onclick="deleteItem({{$review->id}})" class="btn btn-sm btn-danger">
                                                <i class="fas fa-trash"></i>
                                            </a>
                                            <form id="{{$review->id}}" action="{{route('admin.reviews.delete',$review->id)}}" method="post">
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
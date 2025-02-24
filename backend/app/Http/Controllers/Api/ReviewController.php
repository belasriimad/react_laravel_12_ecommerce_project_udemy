<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Store new review
     */
    public function store(Request $request)
    {
        $exists = $this->checkIfUserAlreadyReviewedTheProduct($request->product_id,$request->user()->id);
        if($exists) {
            return response()->json([
                'error' => 'You have already reviewed this product'
            ]);
        }else {
            Review::create([
                'product_id' => $request->product_id,
                'user_id' => $request->user()->id,
                'title' => $request->title,
                'body' => $request->body,
                'rating' => $request->rating,
            ]);
            return response()->json([
                'message' => 'Your review has been added successfully and will be published soon'
            ]);
        }
    }

    public function checkIfUserAlreadyReviewedTheProduct($product_id,$user_id)
    {
        //check if review already exists
        $review = Review::where([
            'product_id' => $product_id,
            'user_id' => $user_id
        ])->first();
        //return the result
        return $review;
    }

    /**
     * Update a review
     */
    public function update(Request $request)
    {
        $review = $this->checkIfUserAlreadyReviewedTheProduct($request->product_id,$request->user()->id);
        if($review) {
            $review->update([
                'product_id' => $request->product_id,
                'user_id' => $request->user()->id,
                'title' => $request->title,
                'body' => $request->body,
                'rating' => $request->rating,
                'approved' => 0
            ]);
            return response()->json([
                'message' => 'Your review has been updated successfully and will be published soon'
            ]);
        }else {
            return response()->json([
                'error' => 'Something went wrong try again later'
            ]);
        }
    }

     /**
     * Delete a review
     */
    public function delete(Request $request)
    {
        $review = $this->checkIfUserAlreadyReviewedTheProduct($request->product_id,$request->user()->id);
        if($review) {
            $review->delete();
            return response()->json([
                'message' => 'Your review has been deleted successfully'
            ]);
        }else {
            return response()->json([
                'error' => 'Something went wrong try again later'
            ]);
        }
    }
}

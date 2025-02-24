<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'discount', 'valid_until'];

    /**
     * convert the coupon name to uppercase
     */
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = Str::upper($value);
    }

    /**
     * check if coupon is valid
     */
    public function checkIfValid()
    {
        if($this->valid_until > Carbon::now()) {
            return true;
        }else {
            return false;
        }
    }
}

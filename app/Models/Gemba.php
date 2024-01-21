<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gemba extends Model
{
    use HasFactory;
    protected $table = "gemba";
    protected $fillable = [
        "gembaName",
    ];

    public function tasks() {
        return $this->hasMany(Task::class);
    }
}

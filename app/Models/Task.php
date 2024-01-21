<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = "task";
    protected $fillable = [
        "taskName",
        "isCompleted",
        "gemba_id"
    ];

    public function gemba()
    {
        return $this->belongsTo(Gemba::class);
    }
}

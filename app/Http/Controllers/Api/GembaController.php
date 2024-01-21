<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Gemba;
class GembaController extends Controller
{
    public function index() {
        $gembas = Gemba::all();
        if($gembas->count() > 0) {
            $data = [
                'status' => 200,
                'gembas' => $gembas,
            ];
        } else {
            $data = [
                'status' => 404,
                'gembas' => 'No records found',
            ];
        }
        return response()->json($data, $data['status']);
    }
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'gembaName' => 'required|string',
        ]);
        
        if($validator->fails()) {
            $data = [
                'status' => 404,
                'gembas' => 'No records found',
            ];
            return response()->json($data, $data['status']);
        }
        $gemba = Gemba::create([
            'gembaName' => $request->gembaName,
        ]);
        if($gemba) {
            $data = [
                'status' => 200,
                'message' => 'gemba created successfull',
            ];
        } else {
            $data = [
                'status' => 500,
                'message' => 'gemba created error',
            ];
        }

        return response()->json($data, $data['status']);
    }
    function getTasksListByGembaId($gembaId) {
        $gemba = Gemba::findOrFail($gembaId);
        $tasks = $gemba->tasks;
        if(!$gemba) {
            $data = [
                'status' => 500,
                'message' => 'gemba record not found',
            ];
        }
        if(!$tasks) {
            $data = [
                'status' => 500,
                'message' => 'gemba task list record not found',
            ];
        }
        $data = [
            'status' => 200,
            'tasks' => $tasks
            ];
        return response()->json($data, $data['status']);

    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function index() {
        $task = Task::all();
        if($task->count() > 0) {
            $data = [
                'status' => 200,
                'task' => $task,
            ];
        } else {
            $data = [
                'status' => 404,
                'task' => 'No records found',
            ];
        }
        return response()->json($data, $data['status']);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'taskName' => 'required|string',
            'isCompleted' => 'required|bool',
            'gemba_id' => 'required|exists:gemba,id',
        ]);
        
        if($validator->fails()) {
            $data = [
                'status' => 404,
                'task' => 'validator'.$validator->errors(),
            ];
            return response()->json($data, $data['status']);
        }
        $task = Task::create([
            'taskName' => $request->taskName,
            'isCompleted' => $request->isCompleted,
            'gemba_id' => $request->gemba_id,
        ]);
        if($task) {
            $data = [
                'status' => 200,
                'message' => 'task created successfull',
            ];
        } else {
            $data = [
                'status' => 500,
                'message' => 'task created error',
            ];
        }

        return response()->json($data, $data['status']);
    }

    public function updateIsCompleted($taskId)
    {
        $task = Task::findOrFail($taskId);
        if (!$task) {
            $data = [
                'status' => 404,
                'task' => 'No records found',
            ];
            return response()->json($data, $data['status']);
        }
        if ($task->isCompleted) {
            $data = [
                'status' => 505,
                'task' => 'task has been completed before',
            ];
            return response()->json($data, $data['status']);
        }
        $task->update([
            'isCompleted' => true,
        ]);

        return response()->json(['message' => 'Task isCompleted updated successfully']);
    }

    public function updateTask(Request $request, $taskId) {
        $task = Task::findOrFail($taskId);

        if (!$task) {
            $data = [
                'status' => 404,
                'task' => 'No records found',
            ];
            return response()->json($data, $data['status']);
        }
        if ($task->isCompleted) {
            $data = [
                'status' => 505,
                'task' => 'task has been completed before',
            ];
            return response()->json($data, $data['status']);
        }
        $task->update(
            $request->all()
        );

        return response()->json(['message' => 'Task isCompleted updated successfully']);
    }
}

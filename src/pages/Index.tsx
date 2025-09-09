import { useState, useEffect } from "react";
import { TodoForm } from "@/components/todo/TodoForm";
import { TodoItem } from "@/components/todo/TodoItem";
import { TodoStats } from "@/components/todo/TodoStats";
import { TodoFilter, FilterType } from "@/components/todo/TodoFilter";
import { MadeWithApplaa } from "@/components/made-with-applaa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function Index() {;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos([newTodo, ...todos]);
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">My Todo List</CardTitle>
            <CardDescription>Stay organized and productive</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoForm onAdd={addTodo} />
            
            {todos.length > 0 && (
              <>
                <TodoStats total={todos.length} completed={completedCount} />
                
                <TodoFilter 
                  currentFilter={filter} 
                  onFilterChange={setFilter} 
                />
                
                <div className="space-y-2">
                  {filteredTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      id={todo.id}
                      text={todo.text}
                      completed={todo.completed}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onEdit={editTodo}
                    />
                  ))}
                </div>
                
                {completedCount > 0 && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCompleted}
                    >
                      Clear Completed
                    </Button>
                  </div>
                )}
              </>
            )}
            
            {todos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-2">No todos yet!</p>
                <p className="text-sm text-gray-400">Add your first todo above to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <MadeWithApplaa />
      </div>
    </div>
  );
}
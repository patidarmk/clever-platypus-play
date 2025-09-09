import { cn } from "@/lib/utils";

interface TodoStatsProps {
  total: number;
  completed: number;
}

export const TodoStats = ({ total, completed }: TodoStatsProps) => {
  const remaining = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className={cn(
        "p-4 rounded-lg text-center",
        "bg-blue-50 text-blue-700"
      )}>
        <div className="text-2xl font-bold">{total}</div>
        <div className="text-sm">Total</div>
      </div>
      
      <div className={cn(
        "p-4 rounded-lg text-center",
        "bg-green-50 text-green-700"
      )}>
        <div className="text-2xl font-bold">{completed}</div>
        <div className="text-sm">Completed</div>
      </div>
      
      <div className={cn(
        "p-4 rounded-lg text-center",
        "bg-orange-50 text-orange-700"
      )}>
        <div className="text-2xl font-bold">{remaining}</div>
        <div className="text-sm">Remaining</div>
      </div>
      
      {total > 0 && (
        <div className="col-span-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">
            {completionRate}% complete
          </p>
        </div>
      )}
    </div>
  );
};
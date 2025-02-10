import React, { useEffect, useState } from 'react';
import Title from '@/components/titles/Title';
import styles from './projects.module.css';

import Input from '@/components/inputs/input';
import ButtonLoading from '@/components/buttons/ButtonLoading';
import InputHidden from '@/components/inputs/inputHidden';

import toast from 'react-hot-toast';
import ModalEnterPassword from '@/components/modals/ModalEnterPassword';
import { getAllTasksProject, updateTaskStatus } from '@/services/api';
import DraggableBoard from '@/components/draggables/DraggableBoard';
import DraggableColumn from '@/components/draggables/DraggableColumn';
import DraggableCard from '@/components/draggables/DraggableCard';
import ModalTask from '@/components/modals/ModalTask';

interface PageTasksProps {
  projectId: string;
}

function PageTasks({ projectId }: PageTasksProps) {
  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  const [droppedCard, setDroppedCard] = useState<string | null>(null);
  const [droppedColumn, setDroppedColumn] = useState<string | null>(null);

  const [cardCordinates, setCardCordinates] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Offset between mouse and card

  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Initial mouse position
  const [isDragging, setIsDragging] = useState(false);

  const [boardData, setBoardData] = useState({
    columns: [
      { status: 'todo', name: 'To do' },
      { status: 'progress', name: 'In progress' },
      { status: 'dev', name: 'Done' },
    ],
  });

  const [tasks, setTasks] = useState<any[]>([]);

  const [modalTask, setModalTask] = useState<string | null>(null);
  
  const toggleModalTask = (taskId?: string) => {
    setModalTask(taskId ? taskId : null);
  }





  const handleClickCard = (taskId?: string) => {
    toggleModalTask(taskId);
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingCard) {
      const dx = Math.abs(e.clientX - startPosition.x);
      const dy = Math.abs(e.clientY - startPosition.y);

      if (!isDragging && (dx > 10 || dy > 10)) {
        setIsDragging(true); // Start dragging if threshold is exceeded
      }

      if (isDragging) {
        setCardCordinates({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    }
  };
  const handleDragStart = (taskId: string, e: React.MouseEvent<HTMLDivElement> | null) => {
    if (!e) return;

    setDraggingCard(taskId);

    // Store the initial mouse position for drag detection
    setStartPosition({ x: e.clientX, y: e.clientY });

    // Calculate the offset between the card's position and the mouse position
    const cardRect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - cardRect.left,
      y: e.clientY - cardRect.top,
    });
  };
  const handleMouseUp = () => {
    if (isDragging) {
      // Handle dropping logic
      setDroppedCard(draggingCard);
    } else {
      // Handle click logic (if no dragging occurred)
      if (draggingCard){
          handleClickCard(draggingCard);
      }
    }

    // Reset state
    setDraggingCard(null);
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });

    setTimeout(() => {
      setDroppedCard(null);
      setDroppedColumn(null);
    }, 10);
  };
  const handleFetchTasks = async () => {
    const call = await getAllTasksProject(projectId);

    if (call.success) {
      setTasks(call.tasks);
    }
  };
  const handleUpdateTask = async (taskId: string, status: string) => {
    const call = await updateTaskStatus(taskId, status);

    if (call.success) {
      //toast.success('Task updated');
      return true;
    } else {
      toast.error(call.message);
      return false;
    }
  };
  const handleAddTaskToArray = (task: any) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
  };

  useEffect(() => {
    handleFetchTasks();

    // Cleanup mouse listeners when the component unmounts
    return () => {
      setDraggingCard(null);
    };
  }, []);
  useEffect(() => {
    if (droppedCard && droppedColumn) {
      const updatedTasks = tasks.map((task: any) => {
        if (task._id === droppedCard) {
          return { ...task, status: droppedColumn }; // Update the status of the task
        }
        return task;
      });
      setTasks(updatedTasks); // Set the updated tasks state

      handleUpdateTask(droppedCard, droppedColumn);
    }
  }, [draggingCard, droppedCard, droppedColumn]);

  return (
    <div
      className={styles.projectsTasks}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: '100%',
        width: '100%',
        cursor: draggingCard ? 'grabbing' : 'grab',
      }}
      onMouseUp={handleMouseUp} // Handle mouse release for both dragging and clicking
      onMouseMove={handleMouseMove}
    >
      <DraggableBoard>
        {boardData.columns.map((column) => (
          <DraggableColumn
            key={column.status}
            projectId={projectId}
            status={column.status}
            isDragging={isDragging}
            name={column.name}
            onAddTask={handleAddTaskToArray}
            onMouseEnter={() => {
              setDroppedColumn(column.status);
            }}
          >
            {tasks
              .filter((task: any) => task.status === column.status)
              .map((colum: any) => (
                <DraggableCard
                  isDragging={isDragging}
                  key={colum._id}
                  title={colum.name}
                  taskId={colum.taskId}
                  selected={colum._id === draggingCard}
                  cardCordinates={cardCordinates}
                  onMouseDown={(e) => handleDragStart(colum._id, e)} // Pass event to calculate offset
                  description={'Description'}
                />
              ))}
          </DraggableColumn>
        ))}
      </DraggableBoard>
      {
        modalTask &&
        <ModalTask
            taskId={modalTask}
            isOpen={!!modalTask}
            onClose={() => toggleModalTask()}
        />
      }
    </div>
  );
}

export default PageTasks;

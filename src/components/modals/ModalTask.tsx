import React, { use, useEffect, useState } from 'react'
import Modal from '../_globals/modal';
import Title from '../titles/Title';
import { getTaskById } from '@/services/api';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './modal.module.css';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { QueueListIcon } from '@heroicons/react/24/solid';
import { BeakerIcon } from '@heroicons/react/24/outline';

interface ModalTaskProps {
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
}

function ModalTask({
  taskId,
  isOpen,
  onClose,
}: ModalTaskProps) {
  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState('');



  const handleFetchTask = async () => {
    setLoading(true);
    const call = await getTaskById(taskId);

    if (!call.success) {
      setLoading(false);
      return toast.error(call.message);
    } else {
      setLoading(false);
    }

    setTask(call.data);
    console.log(call.data)
  }


  useEffect(() => {
    if (taskId) {
      handleFetchTask();
    }
  }, [taskId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      {
        task &&
        <>
          <Title
            title={`${task.name}`}
            subtitle={'Created on ' + new Date(task.dateAdded).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            }
            actionRight={
              <div className='flex items-center justify-center py-1 px-3' style={{ border: '2px solid #ffffff60', borderRadius: '20px', fontSize: '12px' }}>
                TASK - {task.taskId}
              </div>
            }
          />



          <div className='h-[300px] w-full mb-10'>
            <div className='flex flex-row gap-2 mb-2'>
              <Bars3BottomLeftIcon width={22}/>
              <p>Description</p>
            </div>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={(value) => {
                setValue(value)
                console.log(value)
              }}
              className={styles.ql_custom}
            />
          </div>

          <div className='w-full mt-10'>
            <div className='flex flex-row gap-2 mb-2'>
              <QueueListIcon width={22}/>
              <p>Activity</p>
            </div>
            <div className='h-[80px] w-full flex flex-row justify-center items-center gap-2'>
              <BeakerIcon width={20} color='#FFFFFF30'/>
              <p style={{color: '#FFFFFF30'}}>No activity yet</p>
            </div>
          </div>


          
        </>
      }



    </Modal>
  )
}

export default ModalTask
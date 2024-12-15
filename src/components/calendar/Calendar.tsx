import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../_context/AuthContext';
import styles from './calendar.module.css';


import Title from '../titles/Title';
import InputCalendar from '../inputs/InputCalendar';
import Button from '../buttons/Button';

import TileDay from './TileDay';
import VerticalHours from './VerticalHours';

import { 
  ChevronLeft, 
  ChevronRight, 
  PlusIcon 
} from 'lucide-react';

import toast from 'react-hot-toast';
import Modal from '../_globals/modal';

interface CalendarTableProps {
  property: any;
}


function CalendarTable({ property }: CalendarTableProps) {
  const { isActive, role } = useContext(AuthContext)
  const controllerRef = useRef<HTMLDivElement>(null);

  // 1. Get the current date
  const currentDate = new Date();

  // 2. Get the first Sunday of the current week
  const getFirstDayOfWeek = (date: Date): Date => {
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());
    return sunday;
  };

  const [firstDayOfWeek, setFirstDayOfWeek] = useState<Date>(getFirstDayOfWeek(currentDate));
  const [weekEvents, setWeekEvents] = useState<any[]>([]);

  // Controllers date change (step: 1 week)
  const handleNextWeek = () => {
    const nextWeek = new Date(firstDayOfWeek);
    nextWeek.setDate(firstDayOfWeek.getDate() + 7); // Add 7 days
    setFirstDayOfWeek(nextWeek);
  };
  const handlePrevWeek = () => {
    const prevWeek = new Date(firstDayOfWeek);
    prevWeek.setDate(firstDayOfWeek.getDate() - 7); // Subtract 7 days
    setFirstDayOfWeek(prevWeek);
  };
  const handleFetchCalendar = async () => {
   
  }


  //Modal New Reservation
  const [modalNewReservation, setModalNewReservation] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const toggleModalNewReservation = () => {
    setModalNewReservation(prev => !prev);
  }
  const handleCreateManualReservation = async () => {
      
  }


  useEffect(() => {
    if (property) {
      handleFetchCalendar();
    }
  }, [firstDayOfWeek]);
  useEffect(() => {
    if (property) {
      handleFetchCalendar();
    }
  }, [property]);
  useEffect(() => {
    console.log(selectedDay.toISOString().split('T')[0]);
  }, [selectedDay]);

  return (
    <div className={styles.calendar}>
      {/* Controllers for dates & events */}
      <div className={styles.buttons}>
        <div className={styles.buttonsLeft}>
          <div className={styles.today} onClick={() => setFirstDayOfWeek(getFirstDayOfWeek(new Date()))}>
            Oggi
          </div>

          <div className={styles.chevrons}>
            <div className={styles.chevronButton} onClick={handlePrevWeek}>
              <ChevronLeft />
            </div>
            <div className={styles.chevronButton} onClick={handleNextWeek}>
              <ChevronRight />
            </div>
          </div>

          <p className={styles.p}>
            {firstDayOfWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className={styles.buttonsRight}>
          <div className={styles.timeframe}>Settimana</div>
          {
            isActive &&
            role === 'user' &&
            <div onClick={toggleModalNewReservation} className={styles.buttonAppointment}>
              <PlusIcon width={18} />
              <p>Crea</p>
            </div>
          }
          {
            role === 'admin' &&
            <div onClick={toggleModalNewReservation} className={styles.buttonAppointment}>
              <PlusIcon width={18} />
              <p>Crea</p>
            </div>
          }
        </div>
      </div>

      {/* Container Horizontals Days (name only) of the week */}
      <div className={styles.containerControllers} ref={controllerRef}>
        <div className={styles.emptyGap} />

        <div className={styles.containerWeekDays}>
          {Array.from({ length: 7 }, (_, i) => {
            const date = new Date(firstDayOfWeek);
            date.setDate(firstDayOfWeek.getDate() + i);

            return (
              <div key={i} className={styles.controllerDay}>
                <span
                  className={styles.text}
                  style={{
                    color: date.getDate() === currentDate.getDate() ? '#b8e603' : '',
                  }}
                >
                  {date.toLocaleDateString('it-IT', { weekday: 'short' })}
                </span>
                <span
                  className={styles.number}
                  style={{
                    background: date.getDate() === currentDate.getDate() ? '#b8e603' : '',
                    opacity: date.getDate() === currentDate.getDate() ? 0.85 : 1,
                  }}
                >
                  {date.getDate()}
                </span>
                <div className={styles.sideLines} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Container Horizontal Tiles of the Week */}
      <div className={styles.containerTiles}>
        <VerticalHours />

        {Array.from({ length: 7 }, (_, i) => {
          const date = new Date(firstDayOfWeek);
          date.setDate(firstDayOfWeek.getDate() + i);
          return (
            <TileDay
              key={i}
              dayTile={date}
              events={
                weekEvents
                  .filter((event) => {
                    const eventDate = new Date(event.date);
                    // Compare the day, month, and year to ensure they match
                    return (
                      eventDate.getDate() === date.getDate() &&
                      eventDate.getMonth() === date.getMonth() &&
                      eventDate.getFullYear() === date.getFullYear()
                    );
                  })
                  .map((event, index) => {
                    const eventDate = new Date(event.date);
                    return {
                      name: "Pulizia",
                      dateStart: new Date(eventDate.setHours(10 + (index * 2), 0, 0, 0)).toISOString(),
                      dateEnd: new Date(eventDate.setHours(15 + (index * 2), 0, 0, 0)).toISOString(),
                      _id: event._id,
                    }
                  })
              }
            />
          );
        })}
      </div>


      {
        modalNewReservation &&
        <Modal
          isOpen={modalNewReservation}
          onClose={() => setModalNewReservation(false)}
        >
          <Title
            title="Crea Riservazione"
            subtitle="Seleziona la data e l'orario per la nuova riservazione"
          />
          <div className='px-6 flex flex-col gap-2'>
            <InputCalendar
              label="Data"
              value={selectedDay.toISOString().split('T')[0]}
              onChange={(e) => {
                const date = new Date(e);
                setSelectedDay(date);
              }}
            />
            <Button
              text="Crea Riservazione"
              onClick={handleCreateManualReservation}
              color="white"
              backgroundColor="#b8e603"
            />
          </div>
        </Modal>
      }
    </div>
  );
}

export default CalendarTable;

"use client";

import { Calendar } from 'antd';
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import EventModal from './EventModal';
import classNames from 'classnames'; // Sử dụng cho việc class có điều kiện

interface Event {
  id: string;
  title: string;
  startTime: Dayjs;
  endTime: Dayjs;
  type: 'Appointment' | 'Webinar';
}

const EventCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const events: Event[] = [
    {
      id: '1',
      title: 'Appointment with Alex Stan',
      startTime: dayjs('2024-09-05T09:00:00'),
      endTime: dayjs('2024-09-05T09:30:00'),
      type: 'Appointment',
    },
    
    {
      id: '2',
      title: 'Webinar on Next.js',
      startTime: dayjs('2024-09-06T10:00:00'),
      endTime: dayjs('2024-09-06T12:00:00'),
      type: 'Webinar',
    },

    {
        id: '3',
        title: 'Chemistry session with Alex Stan',
        startTime: dayjs('2024-09-05T010:00:00'),
        endTime: dayjs('2024-09-05T010:30:00'),
        type: 'Appointment',
      },

      {
        id: '4',
        title: 'Math session with Alex Stan',
        startTime: dayjs('2024-09-07T010:00:00'),
        endTime: dayjs('2024-09-07T010:30:00'),
        type: 'Appointment',
      },

      {
        id: '5',
        title: 'History session with Alex Stan',
        startTime: dayjs('2024-09-05T011:00:00'),
        endTime: dayjs('2024-09-05T011:30:00'),
        type: 'Appointment',
      }, 
  ];

  const colors = ['#5684AE', '#FFE4C8', '#F9BE81'];

  
  const getTextColor = (bgColor: string) => {
    if (bgColor === '#0F4C81') {
      return '#ffffff'; 
    }
    return '#0F4C81'; 
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = events.filter(
      (event) => event.startTime.isSame(value, 'day')
    );

    return (
      <ul
        
        style={{ padding: '5px', height: '100%', width: '100%' }}
      >
        {listData.map((event, index) => {
          const bgColor = colors[index % colors.length]; 
          const textColor = getTextColor(bgColor); 

          return (
            <li 
              key={event.id}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                padding: '5px',
                marginBottom: '5px',
                borderLeft: '4px solid #3B82F6', 
                borderRadius: '4px',
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis'
            
              }}
            >
              <span>{event.title}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const onSelect = (value: Dayjs) => {
    setSelectedDate(value);
    setIsModalVisible(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border-x-2 border-black">

      <Calendar dateCellRender={dateCellRender} onSelect={onSelect} className='rounded-lg shadow-lg border border-black'
        
       />
      {selectedDate && (
        <EventModal
          visible={isModalVisible}
          date={selectedDate.toDate()} // Chuyển đổi về Date để dùng trong EventModal
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default EventCalendar;

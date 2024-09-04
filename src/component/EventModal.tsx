"use client";

import React from 'react';
import { Modal, Button, Avatar } from 'antd';
import AddEventDrawer from './AddEventDrawer';
import dayjs from 'dayjs';

interface Event {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  type: 'Appointment' | 'Webinar';
  guest?: {
    name: string;
    avatar: string;
  };
}

interface EventModalProps {
  visible: boolean;
  date: Date;
  onClose: () => void;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Appointment with Alex Stan',
    startTime: new Date('2024-09-05T09:00:00'),
    endTime: new Date('2024-09-05T09:30:00'),
    type: 'Appointment',
    guest: {
      name: 'Alex Stan',
      avatar: 'https://i.pravatar.cc/50',
    },
  },
  {
    id: '2',
    title: 'Webinar on Next.js',
    startTime: new Date('2024-09-06T10:00:00'),
    endTime: new Date('2024-09-06T12:00:00'),
    type: 'Webinar',
  },

  {
    id: '3',
    title: 'Chemistry session with Alex Stan',
    startTime: new Date('2024-09-05T09:00:00'),
    endTime: new Date('2024-09-05T09:30:00'),
    type: 'Appointment',
    guest: {
      name: 'Alex Stan',
      avatar: 'https://i.pravatar.cc/50',
    },
  },

  {
    id: '4',
    title: 'History session with Alex Stan',
    startTime: new Date('2024-09-05T09:00:00'),
    endTime: new Date('2024-09-05T09:30:00'),
    type: 'Appointment',
    guest: {
      name: 'Alex Stan',
      avatar: 'https://i.pravatar.cc/50',
    },
  },
];

const colors = ['#5684AE', '#0F4C81', '#FFE4C8', '#F9BE81']; // Màu sắc ngẫu nhiên

const EventModal: React.FC<EventModalProps> = ({ visible, date, onClose }) => {
  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);

  const handleAddEvent = () => {
    setIsDrawerVisible(true);
  };

  // Lọc các sự kiện theo ngày
  const filteredEvents = events.filter(
    (event) => dayjs(event.startTime).isSame(date, 'day')
  );

  return (
    <>
      <Modal
        title={`Events on ${date.toDateString()}`}
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="add" type="primary" onClick={handleAddEvent}>
            Add Event
          </Button>,
        ]}
      >
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              style={{
                backgroundColor: colors[index % colors.length], // Chọn màu ngẫu nhiên
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                color: '#fff',
                borderLeft: "2px",
                borderLeftColor: "blue",
              }}
            >
              <h3 style={{ margin: 0 }}>{event.title}</h3>
              <p style={{ margin: '5px 0' }}>
                {dayjs(event.startTime).format('h:mm A')} -{' '}
                {dayjs(event.endTime).format('h:mm A')} GMT+7
              </p>
              {event.type === 'Appointment' && event.guest && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={event.guest.avatar} size={30} />
                  <a
                    href="#"
                    style={{
                      marginLeft: '10px',
                      color: '#fff',
                      textDecoration: 'underline',
                    }}
                  >
                    View client profile
                  </a>
                </div>
              )}
            </div>
          ))}
          {filteredEvents.length === 0 && <p>No events for this day.</p>}
        </div>
      </Modal>
      <AddEventDrawer
        visible={isDrawerVisible}
        date={date}
        onClose={() => setIsDrawerVisible(false)}
      />
    </>
  );
};

export default EventModal;

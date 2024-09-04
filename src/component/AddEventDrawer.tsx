"use client";

import React from 'react';
import { Drawer, Form, Input, DatePicker, Select, Button, Space } from 'antd';
import { guests } from '@/data/Guest';

interface AddEventDrawerProps {
  visible: boolean;
  date: Date;
  onClose: () => void;
}

const AddEventDrawer: React.FC<AddEventDrawerProps> = ({ visible, date, onClose }) => {
  const [form] = Form.useForm();
  const [eventType, setEventType] = React.useState<'Appointment' | 'Webinar'>('Appointment');

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    onClose();
  };

  return (
    <Drawer
      title="Add Event"
      width={360}
      visible={visible}
      onClose={onClose}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={form.submit}>
            Save
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Event Name"
          rules={[{ required: true, message: 'Please enter event name' }]}
        >
          <Input placeholder="Event Name" />
        </Form.Item>
        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: 'Please select start time' }]}
        >
          <DatePicker showTime format="HH:mm" placeholder="Start Time" />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: 'Please select end time' }]}
        >
          <DatePicker showTime format="HH:mm" placeholder="End Time" />
        </Form.Item>
        <Form.Item
          name="eventType"
          label="Event Type"
          rules={[{ required: true, message: 'Please select event type' }]}
        >
          <Select onChange={(value) => setEventType(value)}>
            <Select.Option value="Appointment">Appointment</Select.Option>
            <Select.Option value="Webinar">Webinar</Select.Option>
          </Select>
        </Form.Item>
        {eventType === 'Appointment' && (
          <Form.Item
            name="guest"
            label="Guest"
            rules={[{ required: true, message: 'Please select a guest' }]}
          >
            <Select placeholder="Select a guest">
              {guests?.map((guest) => (
                <Select.Option key={guest.id} value={guest.name}>
                  {guest.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {eventType === 'Webinar' && (
          <Form.Item
            name="webinarUrl"
            label="Webinar URL"
            rules={[{ required: true, message: 'Please enter Webinar URL' }]}
          >
            <Input placeholder="Webinar URL" />
          </Form.Item>
        )}
      </Form>
    </Drawer>
  );
};

export default AddEventDrawer;

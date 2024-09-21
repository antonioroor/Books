import { Message } from "./message.interface";

export interface Book extends Message{
  id?: number;
	title: string;
	author: string;
	editorial: string;
	category: string;
	year: number;
	read: boolean;
}
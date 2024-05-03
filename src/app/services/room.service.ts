import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'assets/rooms.json';

  constructor(private http: HttpClient) { }

  // Get all rooms
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  // Get room by ID
  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  // Add a new room
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  // Add a new room
  addRoom2(room: Room): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl).pipe(
      switchMap((rooms: Room[]) => {
        room.id = rooms.length + 1; // Assign a unique ID (not recommended for production)
        rooms.push(room);
        return this.http.put<Room[]>(this.apiUrl, rooms);
      })
    );
  }

  // Update a room
  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${room.id}`, room);
  }

  // Delete a room
  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

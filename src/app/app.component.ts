import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'spotify';
  songIndex: number = 0;
  audioElement: HTMLAudioElement = new Audio('/songs/1.mp3');
  progress: number = 0;

  songs: any = [
    { songName: "Ram Siya Ram [NCS Release]", filePath: "/songs/1.mp3", coverPath: "/covers/1.jpg" },
    { songName: "Ram Naam Se Jag Mag", filePath: "/songs/2.mp3", coverPath: "/covers/2.jpg" },
    { songName: "Hanuman Ji ne Saath Diya [NCS Release]-320k", filePath: "/songs/3.mp3", coverPath: "/covers/3.jpg" },
    { songName: "Ram Aynge [NCS Release]", filePath: "/songs/4.mp3", coverPath: "/covers/4.jpg" },
    { songName: "Yug Ram Raj Ka Aagaya-NCS-Release", filePath: "/songs/5.mp3", coverPath: "/covers/5.jpg" },
    { songName: "Sab Kuch Tera Kuch Nhi Mera", filePath: "/songs/2.mp3", coverPath: "/covers/6.jpg" },
    { songName: "Jai Jai Shree Ram", filePath: "/songs/2.mp3", coverPath: "/covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "/songs/2.mp3", coverPath: "/covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "/songs/2.mp3", coverPath: "/covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "/songs/4.mp3", coverPath: "/covers/10.jpg" }
  ];

  currentSong = this.songs[this.songIndex];

  constructor() {}

  ngOnInit(): void {
    // Update progress bar as song plays
    this.audioElement.addEventListener('timeupdate', () => {
      this.progress = parseInt(((this.audioElement.currentTime / this.audioElement.duration) * 100).toString(), 10);
    });
  }

  togglePlay(): void {
    if (this.audioElement.paused) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
  }

  seek(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioElement.currentTime = (parseInt(input.value, 10) / 100) * this.audioElement.duration;
  }

  playSong(index: number): void {
    this.songIndex = index;
    this.currentSong = this.songs[this.songIndex];
    this.audioElement.src = this.currentSong.filePath;
    this.audioElement.currentTime = 0;
    this.audioElement.play();
  }

  next(): void {
    this.songIndex = (this.songIndex + 1) % this.songs.length;
    this.playSong(this.songIndex);
  }

  previous(): void {
    this.songIndex = (this.songIndex - 1 + this.songs.length) % this.songs.length;
    this.playSong(this.songIndex);
  }
}

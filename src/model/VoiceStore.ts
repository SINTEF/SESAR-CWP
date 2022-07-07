import { makeAutoObservable } from 'mobx';

const CURRENT_TEXT_DURATION = 2000;

export default class VoiceStore {
  listening = false;

  currentText = '';

  processingCommand = false;

  clearCurrentTextTimeoutId = 0;

  constructor() {
    makeAutoObservable(this, {
      clearCurrentTextTimeoutId: false,
    });
  }

  setListening(listening: boolean): void {
    this.listening = listening;
  }

  setCurrentText(currentText: string): void {
    this.currentText = currentText.trim();
    window.clearTimeout(this.clearCurrentTextTimeoutId);
    this.clearCurrentTextTimeoutId = window.setTimeout(() => {
      this.clearCurrentText();
    }, CURRENT_TEXT_DURATION);
  }

  clearCurrentText(): void {
    this.currentText = '';
  }

  setProcessingCommand(processingCommand: boolean): void {
    this.processingCommand = processingCommand;
  }
}

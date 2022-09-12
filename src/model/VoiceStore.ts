import { makeAutoObservable } from 'mobx';

const CURRENT_TEXT_DURATION = 2000;

export enum ProcessingCommandStatus {
  NotProcessing,
  Processing,
  Error,
  Success,
}

export default class VoiceStore {
  listening = false;

  currentText = '';

  processingCommandStatus: ProcessingCommandStatus = ProcessingCommandStatus.NotProcessing;

  clearCurrentTextTimeoutId = 0;

  constructor() {
    makeAutoObservable(this, {
      clearCurrentTextTimeoutId: false,
    }, {
      autoBind: true,
    });
  }

  setListening(listening: boolean): void {
    this.listening = listening;
  }

  setCurrentText(currentText: string): void {
    this.currentText = currentText.trim();
    window.clearTimeout(this.clearCurrentTextTimeoutId);
    this.clearCurrentTextTimeoutId = window.setTimeout(() => {
      this.clear();
    }, CURRENT_TEXT_DURATION);
  }

  private clear(): void {
    this.currentText = '';
    this.processingCommandStatus = ProcessingCommandStatus.NotProcessing;
  }

  setProcessingCommand(processingCommand: ProcessingCommandStatus): void {
    this.processingCommandStatus = processingCommand;
  }
}

import Voice, {
  SpeechStartEvent,
  SpeechResultsEvent,
  SpeechEndEvent,
} from '@react-native-voice/voice';

const LOCALE = 'ja-JP';

export const event: Event = {
  onSpeechStart: null,
  onSpeechEnd: null,
  onSpeechResults: null,
};

function onSpeechStart(e: SpeechStartEvent | undefined) {
  console.log('onSpeechStart...');
  if (e?.error) {
    console.error('SpeechStart error', e);
  }

  if (event.onSpeechStart) {
    event.onSpeechStart(!e?.error);
  }
}

function onSpeechEnd(e: SpeechEndEvent | undefined) {
  console.log('onSpeechEnd...');
  if (e?.error) {
    console.error('SpeechEnd error', e.error);
  }
  if (event.onSpeechEnd) {
    event.onSpeechEnd();
  }
}

function onSpeechResults(e: SpeechResultsEvent | undefined) {
  console.log('onSpeechResults', e?.value);

  if (event.onSpeechResults) {
    event.onSpeechResults(e?.value || []);
  }
}

Voice.onSpeechStart = onSpeechStart;
Voice.onSpeechEnd = onSpeechEnd;
Voice.onSpeechResults = onSpeechResults;
Voice.onSpeechError = (e) => {
  console.log('SpeechError', e.error?.message, e.error?.message);
};
Voice.onSpeechRecognized = (e) => {
  console.log('SpeechRecognized', e.isFinal);
};

type Event = {
  onSpeechStart: null | ((result: boolean) => void);
  onSpeechEnd: null | (() => void);
  onSpeechResults: null | ((result: string[]) => void);
}

export function bindEvents(eventListeners: Event) {
  console.log('bindEvents...');
  event.onSpeechStart = eventListeners.onSpeechStart;
  event.onSpeechEnd = eventListeners.onSpeechEnd;
  event.onSpeechResults = eventListeners.onSpeechResults;
}

export async function startSpeaking() {
  console.log('startSpeaking...');
  try {
    await Voice.start(LOCALE);
  } catch (error) {
    return false;
  }

  return true;
}

export async function stopSpeaking() {
  console.log('stopSpeaking...');
  try {
    const isAvailableBefore = await Voice.isAvailable();
    console.log('isAvailableBefore', isAvailableBefore);
    const isRecognizingBefore = await Voice.isRecognizing();
    console.log('isRecognizingBefore', isRecognizingBefore);

    const destroy = await Voice.destroy();
    console.log('destroy', destroy);
    const stop = await Voice.stop();
    console.log('stop', stop);
    const cancel = await Voice.cancel();
    console.log('cancel', cancel);

    const isAvailableAfter = await Voice.isAvailable();
    console.log('isAvailableAfter', isAvailableAfter);

    const isRecognizingAfter = await Voice.isRecognizing();
    console.log('isRecognizingAfter', isRecognizingAfter);

    if (event.onSpeechEnd) {
      event.onSpeechEnd();
    }
  } catch (error) {
    console.error('Voice.stop error', error);
  }
}

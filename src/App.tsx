import { useState, useRef, useEffect } from 'react';

// ========== ICONS ==========

const MicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const MicOffIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" x2="22" y1="2" y2="22" />
    <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
    <path d="M5 10v2a7 7 0 0 0 12 5" />
    <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
    <line x1="12" x2="12" y1="19" y2="22" />
  </svg>
);

const SettingsIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const BotIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Volume2Icon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const Trash2Icon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);

const AlertCircleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

// ========== TYPES ==========

interface AudioFile {
  id: string;
  name: string;
  url: string;
  type: string;
}

interface Message {
  id: string;
  role: 'user' | 'lenny' | 'system';
  message: string;
  timestamp: Date;
}

type Mode = 'classic' | 'ai';

// ========== MAIN COMPONENT ==========

function App() {
  const [mode, setMode] = useState<Mode>('classic');
  const [isListening, setIsListening] = useState(false);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [openAIKey, setOpenAIKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [conversationLog, setConversationLog] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const currentPlaybackRef = useRef<HTMLAudioElement | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // ========== CONVERSATION LOG HELPERS ==========

  const addMessage = (role: Message['role'], message: string) => {
    setConversationLog(prev => [...prev, {
      id: Date.now().toString(),
      role,
      message,
      timestamp: new Date()
    }]);
  };

  // ========== VOICE ACTIVITY DETECTION ==========

  const checkAudioLevel = () => {
    if (!analyserRef.current || !isListening) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

    if (average < 30) {
      if (!silenceTimeoutRef.current) {
        silenceTimeoutRef.current = setTimeout(() => {
          stopRecording();
        }, 2000);
      }
    } else {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
    }

    animationFrameRef.current = requestAnimationFrame(checkAudioLevel);
  };

  // ========== MICROPHONE CONTROL ==========

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        handleRecordingComplete();
      };

      mediaRecorder.start(100);
      setIsListening(true);
      addMessage('system', '🎤 Listening... Speak now');
      checkAudioLevel();
    } catch (error) {
      console.error('Microphone access denied:', error);
      addMessage('system', '❌ Microphone access denied. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsListening(false);
  };

  const handleRecordingComplete = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

    if (mode === 'classic') {
      await handleClassicMode();
    } else {
      await handleAIMode(audioBlob);
    }
  };

  // ========== CLASSIC MODE ==========

  const handleClassicMode = async () => {
    if (audioFiles.length === 0) {
      addMessage('system', '❌ Please upload Lenny audio files in settings first');
      return;
    }

    setIsProcessing(true);
    addMessage('system', '⏳ Processing...');

    const randomFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];

    addMessage('system', `🎵 Playing: ${randomFile.name}`);

    const audio = new Audio(randomFile.url);
    currentPlaybackRef.current = audio;

    audio.onended = () => {
      setIsProcessing(false);
      setTimeout(() => {
        startListening();
      }, 500);
    };

    audio.onerror = () => {
      setIsProcessing(false);
      addMessage('system', '❌ Error playing audio file');
    };

    audio.play();
    addMessage('lenny', `[Audio: ${randomFile.name}]`);
  };

  // ========== AI MODE ==========

  const handleAIMode = async (audioBlob: Blob) => {
    if (!openAIKey) {
      addMessage('system', '❌ Please enter your OpenAI API key in settings');
      return;
    }

    setIsProcessing(true);
    addMessage('system', '⏳ Processing...');

    try {
      const transcription = await transcribeAudio(audioBlob);

      addMessage('user', transcription);

      const response = await generateResponse(transcription);

      const audioUrl = await generateSpeech(response);

      const audio = new Audio(audioUrl);
      currentPlaybackRef.current = audio;

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsProcessing(false);
        setTimeout(() => {
          startListening();
        }, 500);
      };

      audio.onerror = () => {
        setIsProcessing(false);
        addMessage('system', '❌ Error playing generated speech');
      };

      audio.play();
      addMessage('lenny', response);

    } catch (error: unknown) {
      setIsProcessing(false);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addMessage('system', `❌ Error: ${errorMessage}`);
    }
  };

  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const conversationHistory = conversationLog
      .filter(msg => msg.role !== 'system')
      .slice(-10)
      .map(msg => ({
        role: msg.role === 'lenny' ? 'assistant' : 'user',
        content: msg.message
      }));

    conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: "You are Lenny, a confused but friendly elderly man who loves rambling about family, especially daughters. Goal: waste caller's time by being vague, asking them to repeat things, going off on tangents, never understanding what they want, and bringing up irrelevant family stories. Keep responses 2-3 sentences. Be charming but unhelpful."
          },
          ...conversationHistory
        ],
        temperature: 0.9,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`Chat completion failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const generateSpeech = async (text: string): Promise<string> => {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'onyx',
        input: text,
        speed: 0.85
      })
    });

    if (!response.ok) {
      throw new Error(`Speech generation failed: ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  };

  // ========== FILE MANAGEMENT ==========

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: AudioFile[] = [];

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      newFiles.push({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        url,
        type: file.type
      });
    });

    setAudioFiles(prev => [...prev, ...newFiles]);
    addMessage('system', `✅ Uploaded ${newFiles.length} audio file(s)`);
  };

  const deleteFile = (id: string) => {
    const file = audioFiles.find(f => f.id === id);
    if (file) {
      URL.revokeObjectURL(file.url);
    }
    setAudioFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearConversation = () => {
    setConversationLog([]);
    if (currentPlaybackRef.current) {
      currentPlaybackRef.current.pause();
      currentPlaybackRef.current = null;
    }
  };

  // ========== CLEANUP ==========

  useEffect(() => {
    return () => {
      audioFiles.forEach(file => URL.revokeObjectURL(file.url));
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (currentPlaybackRef.current) {
        currentPlaybackRef.current.pause();
      }
    };
  }, []);

  // ========== RENDER ==========

  const getStatusText = () => {
    if (isProcessing) {
      return { title: '⏳ Processing...', desc: 'Generating response' };
    }
    if (isListening) {
      return { title: '🎤 Listening...', desc: 'Speak now, I\'ll respond after 2 seconds of silence' };
    }
    return { title: 'Ready', desc: 'Click the microphone to start' };
  };

  const status = getStatusText();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <BotIcon className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">LennyBot Interactive</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Waste scammers' time with classic Lenny or AI-powered responses
          </p>
        </div>

        {/* MODE SELECTION */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              onClick={() => setMode('classic')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                mode === 'classic'
                  ? 'bg-purple-600 scale-105 shadow-lg shadow-purple-600/50'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Volume2Icon className="w-6 h-6" />
              Classic Mode
            </button>
            <button
              onClick={() => setMode('ai')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                mode === 'ai'
                  ? 'bg-blue-600 scale-105 shadow-lg shadow-blue-600/50'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <BotIcon className="w-6 h-6" />
              AI Mode
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="py-4 px-6 rounded-xl font-semibold text-white bg-white/20 hover:bg-white/30 transition-all duration-200"
            >
              <SettingsIcon className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-300 text-sm text-center">
            {mode === 'classic'
              ? 'Playing random Lenny audio files from your uploads'
              : 'Using OpenAI to generate dynamic Lenny responses'}
          </p>
        </div>

        {/* SETTINGS PANEL */}
        {showSettings && (
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-2xl font-bold text-white">Settings</h2>

            <div className="space-y-2">
              <label className="block text-white font-medium">
                Upload Lenny Audio Files (WAV/MP3)
              </label>
              <input
                type="file"
                multiple
                accept=".wav,.mp3,audio/wav,audio/mpeg,audio/mp3"
                onChange={handleFileUpload}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white file:cursor-pointer hover:file:bg-purple-700"
              />
              <p className="text-gray-400 text-sm">
                Upload Lenny1.wav through Lenny16.wav for classic mode
              </p>
            </div>

            {audioFiles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-white font-medium">Uploaded Files ({audioFiles.length})</h3>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {audioFiles.map(file => (
                    <div key={file.id} className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                      <span className="text-white truncate flex-1">{file.name}</span>
                      <button
                        onClick={() => deleteFile(file.id)}
                        className="ml-2 p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                      >
                        <Trash2Icon className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mode === 'ai' && (
              <div className="space-y-2">
                <label className="block text-white font-medium">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  placeholder="sk-..."
                  value={openAIKey}
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-400 text-sm">
                  Get your API key from <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">platform.openai.com</a>
                </p>
              </div>
            )}
          </div>
        )}

        {/* MICROPHONE CONTROL */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8">
          <div className="flex flex-col items-center space-y-6">
            <button
              onClick={isListening ? stopRecording : startListening}
              disabled={isProcessing}
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-200 ${
                isProcessing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : isListening
                  ? 'bg-red-600 animate-pulse'
                  : 'bg-green-600 hover:scale-110'
              }`}
            >
              {isProcessing ? (
                <span className="text-5xl animate-spin">⏳</span>
              ) : isListening ? (
                <MicOffIcon className="w-12 h-12 text-white" />
              ) : (
                <MicIcon className="w-12 h-12 text-white" />
              )}
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">{status.title}</h3>
              <p className="text-gray-300">{status.desc}</p>
            </div>

            {conversationLog.length > 0 && (
              <button
                onClick={clearConversation}
                className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-2 transition-colors"
              >
                <Trash2Icon className="w-5 h-5" />
                Clear Conversation
              </button>
            )}
          </div>
        </div>

        {/* CONVERSATION LOG */}
        {conversationLog.length > 0 && (
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">Conversation Log</h2>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {conversationLog.map(msg => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600/40 ml-8'
                      : msg.role === 'lenny'
                      ? 'bg-purple-600/40 mr-8'
                      : 'bg-gray-600/40 mx-8'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {msg.role === 'user' && <UserIcon className="w-5 h-5 text-white" />}
                      {msg.role === 'lenny' && <BotIcon className="w-5 h-5 text-white" />}
                      {msg.role === 'system' && <AlertCircleIcon className="w-5 h-5 text-white" />}
                      <span className="font-semibold text-white capitalize">{msg.role}</span>
                    </div>
                    <span className="text-gray-300 text-sm">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INSTRUCTIONS */}
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white">📖 How to Use:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li><strong className="text-white">Classic Mode:</strong> Upload Lenny WAV files in settings, then click microphone</li>
            <li><strong className="text-white">AI Mode:</strong> Enter OpenAI API key in settings for dynamic responses</li>
            <li>Click the microphone and speak</li>
            <li>The bot waits 2 seconds of silence before responding</li>
            <li>Lenny responds and continues listening automatically</li>
            <li>Perfect for wasting scammers' time! 😄</li>
          </ol>

          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mt-4">
            <p className="text-yellow-200">
              ⚠️ <strong>Note:</strong> For Classic Mode, download Lenny audio files from:{' '}
              <a
                href="https://github.com/brezniczky/lennybot"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-100"
              >
                github.com/brezniczky/lennybot
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

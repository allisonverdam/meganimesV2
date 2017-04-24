declare var global;

export class meuChromecast {
        
    private currentMediaSession;
    private currentVolume;
    private progressFlag;
    private mediaCurrentTime;
    private session;

    private _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

    constructor(){ }

    getCurrentMediaSession(){
        return this.currentMediaSession;
    }

    setCurrentMediaSession(currentMediaSession){
        this.currentMediaSession = currentMediaSession;
    }

    getCurrentVolume(){
        return this.currentVolume;
    }

    setCurrentVolume(currentVolume){
        this.currentVolume = currentVolume;
    }

    getProgressFlag(){
        return this.progressFlag;
    }

    setProgressFlag(progressFlag){
        this.progressFlag = progressFlag;
    }

    getMediaCurrentTime(){
        return this.mediaCurrentTime;
    }

    setMediaCurrentTime(mediaCurrentTime){
        this.mediaCurrentTime = mediaCurrentTime;
    }

    getSession(){
        return this.session;
    }

    setSession(session){
        this.session = session;
        let storeSession = {id: session.id}
        localStorage.setItem('session', JSON.stringify(storeSession))
    }
}
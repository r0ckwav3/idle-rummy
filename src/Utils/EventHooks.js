import eventManager from './EventManager.js';
import {useEffect} from 'react';

export default function useEventHook(hook_name, callback){
  useEffect(()=>{
    const eventHook = eventManager.createHook(hook_name, callback);

    return () => {
      eventManager.removeHook(eventHook);
    };
  });
}

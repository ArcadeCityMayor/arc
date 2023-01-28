import * as THREE from 'three';

export class State {
  _parent: any;

  constructor(parent) {
    this._parent = parent;
  }

  Enter(prevState) {}
  Exit() {}
  Update(timeElapsed, input) {}
}

export class DeathState extends State {
  _action: any;

  constructor(parent) {
    super(parent);

    this._action = null;
  }

  get Name() {
    return 'death';
  }

  Enter(prevState) {
    this._action = this._parent._proxy.animations['death'].action;

    this._action.reset();
    this._action.setLoop(THREE.LoopOnce, 1);
    this._action.clampWhenFinished = true;

    if (prevState) {
      const prevAction = this._parent._proxy.animations[prevState.Name].action;

      this._action.crossFadeFrom(prevAction, 0.2, true);
      this._action.play();
    } else {
      this._action.play();
    }
  }

  Exit() {}

  Update(_) {}
}

export class DanceState extends State {
  _action: any;
  _FinishedCallback: any;

  constructor(parent) {
    super(parent);

    this._action = null;

    this._FinishedCallback = () => {
      this._Finished();
    };
  }

  get Name() {
    return 'dance';
  }

  Enter(prevState) {
    this._action = this._parent._proxy.animations['dance'].action;
    const mixer = this._action.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    this._action.reset();
    this._action.setLoop(THREE.LoopOnce, 1);
    this._action.clampWhenFinished = true;

    if (prevState) {
      const prevAction = this._parent._proxy.animations[prevState.Name].action;

      this._action.crossFadeFrom(prevAction, 0.2, true);
      this._action.play();
    } else {
      this._action.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    if (this._action) {
      this._action.getMixer().removeEventListener('finished', this._FinishedCallback);
    }
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {}
}

export class AttackState extends State {
  _action: any;
  _FinishedCallback: any;

  constructor(parent) {
    super(parent);

    this._action = null;

    this._FinishedCallback = () => {
      this._Finished();
    };
  }

  get Name() {
    return 'attack';
  }

  Enter(prevState) {
    this._action = this._parent._proxy.animations['attack'].action;
    const mixer = this._action.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy.animations[prevState.Name].action;

      this._action.reset();
      this._action.setLoop(THREE.LoopOnce, 1);
      this._action.clampWhenFinished = true;
      this._action.crossFadeFrom(prevAction, 0.4, true);
      this._action.play();
    } else {
      this._action.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    if (this._action) {
      this._action.getMixer().removeEventListener('finished', this._FinishedCallback);
    }
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {}
}

export class WalkState extends State {
  // constructor(parent) {
  //   super(parent);
  // }

  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy.animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy.animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name === 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.1, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {}

  Update(timeElapsed, input) {
    if (!input) {
      return;
    }

    if (input._keys.forward || input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
      return;
    }

    this._parent.SetState('idle');
  }
}

export class RunState extends State {
  // constructor(parent) {
  //   super(parent);
  // }

  get Name() {
    return 'run';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy.animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy.animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name === 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.1, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {}

  Update(timeElapsed, input) {
    if (!input) {
      return;
    }

    if (input._keys.forward || input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
}

export class IdleState extends State {
  // constructor(parent) {
  //   super(parent);
  // }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy.animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy.animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.25, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {}

  Update(_, input) {
    if (!input) {
      return;
    }

    if (input._keys.forward || input._keys.backward) {
      this._parent.SetState('walk');
    } else if (input._keys.space) {
      this._parent.SetState('attack');
    } else if (input._keys.backspace) {
      this._parent.SetState('dance');
    }
  }
}

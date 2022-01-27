import { ActionReducerMapBuilder, CaseReducer, Action } from '@reduxjs/toolkit';

interface TypedActionCreator<Type = any> {
  (...args: any[]): Action<Type>;
  type: Type;
}

interface ThunkActionCreator {
  pending: TypedActionCreator;
  fulfilled: TypedActionCreator;
  rejected: TypedActionCreator;
}

interface TAsyncReducer<TState, TAction extends ThunkActionCreator> {
  fulfilled?: CaseReducer<TState, ReturnType<TAction['fulfilled']>>;
  pending?: CaseReducer<TState, ReturnType<TAction['pending']>>;
  rejected?: CaseReducer<TState, ReturnType<TAction['rejected']>>;
}

function isThunkActionCreator(
  action: TypedActionCreator | ThunkActionCreator
): action is ThunkActionCreator {
  return (
    action.hasOwnProperty('pending') ||
    action.hasOwnProperty('fulfilled') ||
    action.hasOwnProperty('rejected')
  );
}

export function createReducerBuilder<TState>() {
  return <TAction extends TypedActionCreator | ThunkActionCreator>(
    action: TAction,
    reducer: TAction extends ThunkActionCreator
      ? TAsyncReducer<TState, TAction>
      : TAction extends TypedActionCreator
      ? CaseReducer<TState, ReturnType<TAction>>
      : never
  ) => {
    return (builder: ActionReducerMapBuilder<TState>) => {
      if (isThunkActionCreator(action)) {
        const a = action as ThunkActionCreator;
        const r = reducer as TAsyncReducer<TState, typeof a>;

        if (r.fulfilled) {
          builder.addCase(a.fulfilled, r.fulfilled);
        }

        if (r.pending) {
          builder.addCase(a.pending, r.pending);
        }

        if (r.rejected) {
          builder.addCase(a.rejected, r.rejected);
        }
      } else {
        const a = action as TypedActionCreator;
        const r = reducer as CaseReducer<TState, ReturnType<typeof a>>;
        builder.addCase(a, r);
      }
    };
  };
}

export interface ManagementReducerState{
  login: boolean
  username: string
  profile_info?: any
  profile: boolean
  task: boolean
  task_info?:any
  task_detail?:any
  chart:boolean
  chart_info?:any
  vehcile:boolean
  vehicle_info?:any
}

const initialState: ManagementReducerState = {
  login:false,
  profile:false,
  username: '',
  task:false,
  chart:true,
  vehcile:true
}

export function reducer(state = initialState,action){
  switch(action.type){
    // case "LOGOUT":
    //   return {
    //     ...state,
    //     login:false,
    //     username: action.payload
    //   }
    // case "LOGIN":
    //   return{
    //     ...state,
    //     login:true,
    //     username: action.payload
    //   }
    case "VEHICLE":
      return{
        ...state,
        vehicle: true,
        vehicle_info: action.payload
      }
    case "PROFILE":
      return{
        ...state,
        profile: true,
        profile_info: action.payload
      }

    case "CHART":
      return{
        ...state,
        chart:true,
        chart_info: action.payload
      }
      default: return state
  }
}

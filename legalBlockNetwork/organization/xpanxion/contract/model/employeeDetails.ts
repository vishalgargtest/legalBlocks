export class EmployeeDetails{
    public empName : String
    public panNumber:string
    public skillSetWorked:Technology[]
    public organizationName:string
    public documents:document[]
}
export class Technology{
    public technologyName:string
    public experienceInMonths:number
    public experienceInYears:number
}
export class document{
    public digilockerId:number
}
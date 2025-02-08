export class CreateIncidentCommand {
  constructor(
    public readonly id: number | null,
    public readonly test_id: number,
    public readonly incident_date: Date,
    public readonly type: string,
    public readonly severity:'low' | 'medium' | 'high',
    public readonly description: string,
    public readonly actions_taken?: string
  ) {}
}
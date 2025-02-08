export class UpdateIncidentCommand {
  constructor(
    public readonly id: number,
    public readonly test_id?: number,
    public readonly incident_date?: Date,
    public readonly type?: string,
    public readonly severity?: string,
    public readonly description?: string,
    public readonly actions_taken?: string
  ) {}
}
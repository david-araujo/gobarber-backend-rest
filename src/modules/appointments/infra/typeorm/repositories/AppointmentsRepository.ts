import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

// import { isEqual } from 'date-fns';
// import Appointment from '../models/Appointment';

// interface createAppointmentDTO {
//   provider: string;
//   date: Date;
// }

// class AppointmentsRepository {
//   private appointments: Appointment[];

//   constructor() {
//     this.appointments = [];
//   }

//   public all(): Appointment[] {
//     return this.appointments;
//   }

//   public findByDate(date: Date): Appointment | null {
//     const findAppointment = this.appointments.find(appointment =>
//       isEqual(date, appointment.date),
//     );

//     return findAppointment || null;
//   }

//   public create({ provider, date }: createAppointmentDTO): Appointment {
//     const appointment = new Appointment({ provider, date });
//     this.appointments.push(appointment);
//     return appointment;
//   }
// }

export default AppointmentsRepository;

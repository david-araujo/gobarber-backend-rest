import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is alredy booked');

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

// import { startOfHour } from 'date-fns';
// import Appointment from '../models/Appointment';
// import AppointmentsRepository from '../repositories/AppointmentsRepository';

// interface RequestDTO {
//   provider: string;
//   date: Date;
// }

// class CreateAppointmentService {
//   private appointmentsRepository: AppointmentsRepository;

//   constructor(appointmentsRepository: AppointmentsRepository) {
//     this.appointmentsRepository = appointmentsRepository;
//   }

//   public execute({ provider, date }: RequestDTO): Appointment {
//     const appointmentDate = startOfHour(date);

//     const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
//       appointmentDate,
//     );

//     if (findAppointmentInSameDate)
//       throw Error('This appointment is alredy booked');

//     const appointment = this.appointmentsRepository.create({
//       provider,
//       date: appointmentDate,
//     });

//     return appointment;
//   }
// }

export default CreateAppointmentService;

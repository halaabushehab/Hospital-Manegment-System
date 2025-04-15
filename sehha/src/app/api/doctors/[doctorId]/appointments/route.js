
// import { MongoClient, ObjectId } from 'mongodb';

// // Database connection
// const uri = process.env.MONGODB_URI;
// const dbName = process.env.MONGODB_DB || 'hospital';

// export async function GET(request, { params }) {
//   console.log("API route called with doctor ID:", params.doctorId);
  
//   try {
//     // Connect directly to MongoDB
//     const client = await MongoClient.connect(uri);
//     const db = client.db(dbName);
    
//     // Convert string ID to MongoDB ObjectId
//     let doctorObjectId;
//     try {
//       doctorObjectId = new ObjectId(params.doctorId);
//     } catch (error) {
//       console.error("Invalid ObjectId format:", error);
//       return Response.json({ error: 'Invalid doctor ID format' }, { status: 400 });
//     }
    
//     // Query the appointments collection (note: check your actual collection name)
//     const collection = db.collection('appointments');
//     const appointments = await collection.find({
//       doctorId: doctorObjectId
//     }).toArray();
    
//     console.log(`Found ${appointments.length} appointments for doctor`);
    
//     await client.close();
//     return Response.json(appointments);
//   } catch (error) {
//     console.error("Error in API route:", error);
//     return Response.json({ error: 'Server error while fetching appointments' }, { status: 500 });
//   }
// }

// app/api/doctors/[doctorId]/appointments/route.js
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'hospital';

export async function GET(request, { params }) {
  console.log("API route called with doctor ID:", params.doctorId);
 
  try {
    // Connect directly to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
   
    // Convert string ID to MongoDB ObjectId
    let doctorObjectId;
    try {
      doctorObjectId = new ObjectId(params.doctorId);
    } catch (error) {
      console.error("Invalid ObjectId format:", error);
      return Response.json({ error: 'Invalid doctor ID format' }, { status: 400 });
    }
   
    // Get doctor from doctors collection
    const doctor = await db.collection('doctors').findOne({
      _id: doctorObjectId
    });

    // If doctor has userId field, get name from users collection
    let doctorName = 'Unknown';
    if (doctor && doctor.userId) {
      try {
        const doctorUser = await db.collection('users').findOne({
          _id: new ObjectId(doctor.userId)
        });
        if (doctorUser && doctorUser.name) {
          doctorName = doctorUser.name;
        } else if (doctor.name) {
          // Fallback to name in doctors collection if available
          doctorName = doctor.name;
        }
      } catch (error) {
        console.error("Error fetching doctor user:", error);
        // Fallback to name in doctors collection if available
        if (doctor.name) doctorName = doctor.name;
      }
    } else if (doctor && doctor.name) {
      // Use the name directly from doctors collection if available
      doctorName = doctor.name;
    }
   
    // Use aggregation to join patient information
    const appointments = await db.collection('appointments').aggregate([
      {
        $match: { doctorId: doctorObjectId }
      },
      {
        $lookup: {
          from: 'patientrecords',
          localField: 'patientId',
          foreignField: '_id',
          as: 'patientDetails'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'patientId',
          foreignField: '_id',
          as: 'patientUsers'
        }
      },
      {
        $addFields: {
          // Try to get name from patientrecords first, then from users as fallback
          patientName: {
            $cond: {
              if: { $gt: [{ $size: '$patientDetails' }, 0] },
              then: { $arrayElemAt: ['$patientDetails.name', 0] },
              else: { $arrayElemAt: ['$patientUsers.name', 0] }
            }
          }
        }
      }
    ]).toArray();
   
    console.log(`Found ${appointments.length} appointments for doctor ${doctorName}`);
   
    const result = {
      doctorName: doctorName,
      appointments: appointments
    };
   
    await client.close();
    return Response.json(result);
  } catch (error) {
    console.error("Error in API route:", error);
    return Response.json({ error: 'Server error while fetching appointments' }, { status: 500 });
  }
}
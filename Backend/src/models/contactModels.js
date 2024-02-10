const contactSchema = new mongoose.Schema({

    first: {
      type: String,
      required: true,
      trim: true
    },
    last: {
      type: String,
      required: true,
      trim: true
    },
    twitter: {
      type: String,
      trim: true,
      match: [/^@?(\w){1,15}$/, 'Please fill a valid Twitter handle'],
    },
    avatar: {
      type: String,
      trim: true,
      default: ''
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    }
  });
  
  const Contact = mongoose.model('Contact', contactSchema);
  
  export default Contact;
  
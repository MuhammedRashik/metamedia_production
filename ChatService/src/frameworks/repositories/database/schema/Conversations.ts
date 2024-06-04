import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
    },
    newMessageCount: {
        type: Map,
        of: Number,
        default: {}
    }
});

const Conversation = mongoose.model('conversation', conversationSchema);

export { Conversation };
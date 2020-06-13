class VoteMng {
    totalVote = 0;
    ok = 0;
    sos = 0;
    set = 0;
    topic;

    // When voting OK or SOS, increment the total vote.
    async vote() {
        this.totalVote++;
    }
    
    // Vote OK
    async voteOK(set) {
        // Allow voting only if they have not voted.
        if(set!=this.set) {
            this.ok++;
            this.vote();
            return this.set;
        }
        
        return 0;
    }

    // Vote SOS
    async voteSOS(set) {
        // Allow voting only if they have not voted.
        if(set!=this.set) {
            this.sos++;
            this.vote();
            return this.set;
        }

        return 0;
    }

    // Get the percentage of OK votes
    async getOKPercent() {
        // Return 50% if there is no vote
        if(this.totalVote==0) {
            return 50;
        }
        return Math.round(this.ok/this.totalVote*100);
    }

    // Get the percentage of SOS votes
    async getSOSPercent() {
        // Return 50% if there is no vote
        if(this.totalVote==0) {
            return 50;
        }
        return Math.round(this.sos/this.totalVote*100);
    }

    // Reset the topic
    async reset(topic) {
        // Initialize everything to 0
        this.totalVote = 0;
        this.ok = 0;
        this.sos = 0;

        // Increment the set
        this.set++;

        // Set to the current topic
        this.topic = topic;
        
        return true;
    }

    async getSet() {
        return this.set;
    }

    async getTopic() {
        return this.topic;
    }

    async getTotalVote() {
        return this.totalVote;
    }
}

module.exports = VoteMng;
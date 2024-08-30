document.addEventListener('alpine:init', () => {
    Alpine.data('pricePlanManager', () => ({
        pricePlans: [],
        newPricePlan: {
            name: '',
            call_cost: 0.0,
            sms_cost: 0.0,
        },

        async fetchPricePlans() {
            try {
                const response = await fetch('/api/price_plans');
                this.pricePlans = await response.json();
            } catch (error) {
                console.error('Error fetching price plans:', error);
            }
        },

        async createPricePlan() {
            try {
                const response = await fetch('/api/price_plan/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: this.newPricePlan.name,
                        call_cost: this.newPricePlan.call_cost,
                        sms_cost: this.newPricePlan.sms_cost
                    }),
                });

                if (response.ok) {
                    alert('Price plan created successfully!');
                    this.newPricePlan = { name: '', call_cost: 0.0, sms_cost: 0.0 }; 
                    this.fetchPricePlans(); 
                } else {
                    alert('Failed to create price plan.');
                }
            } catch (error) {
                console.error('Error creating price plan:', error);
            }
        },

        init() {
            this.fetchPricePlans();
        },
    }));
});

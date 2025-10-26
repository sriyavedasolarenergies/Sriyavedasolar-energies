import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Calendar } from 'lucide-react';

interface OrderStatus {
  id: string;
  customerName: string;
  systemSize: string;
  orderDate: string;
  status: 'pending' | 'survey' | 'approved' | 'manufacturing' | 'dispatched' | 'installation' | 'completed';
  expectedDelivery: string;
  contactPerson: string;
  location: string;
  timeline: {
    step: string;
    status: 'completed' | 'current' | 'pending';
    date?: string;
    description: string;
  }[];
}

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderData, setOrderData] = useState<OrderStatus | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  // Mock data for demo
  const mockOrders: OrderStatus[] = [
    {
      id: 'SV2025001',
      customerName: 'Rajesh Kumar',
      systemSize: '5 kW',
      orderDate: '2025-01-15',
      status: 'installation',
      expectedDelivery: '2025-01-30',
      contactPerson: 'Amit Sharma - +91 9876543210',
      location: 'Bangalore, Karnataka',
      timeline: [
        { step: 'Order Placed', status: 'completed', date: '2025-01-15', description: 'Order received and payment confirmed' },
        { step: 'Site Survey', status: 'completed', date: '2025-01-18', description: 'Technical site assessment completed' },
        { step: 'Design Approval', status: 'completed', date: '2025-01-20', description: 'System design approved by customer' },
        { step: 'Manufacturing', status: 'completed', date: '2025-01-25', description: 'Components manufactured and quality checked' },
        { step: 'Dispatch', status: 'completed', date: '2025-01-28', description: 'System dispatched to site location' },
        { step: 'Installation', status: 'current', description: 'Installation team deployed, work in progress' },
        { step: 'Commissioning', status: 'pending', description: 'System testing and grid connection' },
        { step: 'Completed', status: 'pending', description: 'Project handover and warranty activation' }
      ]
    },
    {
      id: 'SV2025002',
      customerName: 'Priya Patel',
      systemSize: '3 kW',
      orderDate: '2025-01-20',
      status: 'survey',
      expectedDelivery: '2025-02-10',
      contactPerson: 'Suresh Reddy - +91 9876543211',
      location: 'Mumbai, Maharashtra',
      timeline: [
        { step: 'Order Placed', status: 'completed', date: '2025-01-20', description: 'Order received and payment confirmed' },
        { step: 'Site Survey', status: 'current', description: 'Site survey scheduled for tomorrow' },
        { step: 'Design Approval', status: 'pending', description: 'Awaiting site survey completion' },
        { step: 'Manufacturing', status: 'pending', description: 'Will begin after design approval' },
        { step: 'Dispatch', status: 'pending', description: 'Components will be dispatched' },
        { step: 'Installation', status: 'pending', description: 'Professional installation' },
        { step: 'Commissioning', status: 'pending', description: 'System testing and grid connection' },
        { step: 'Completed', status: 'pending', description: 'Project handover and warranty activation' }
      ]
    }
  ];

  const searchOrder = async () => {
    setIsSearching(true);
    setError('');
    
    setTimeout(() => {
      const foundOrder = mockOrders.find(order => 
        order.id.toLowerCase() === orderId.toLowerCase() || 
        (phoneNumber && order.contactPerson.includes(phoneNumber.slice(-4)))
      );
      
      if (foundOrder) {
        setOrderData(foundOrder);
        setError('');
      } else {
        setOrderData(null);
        setError('Order not found. Please check your Order ID or Phone Number.');
      }
      setIsSearching(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'current': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'pending': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5" />;
      case 'current': return <Clock className="h-5 w-5 animate-pulse" />;
      case 'pending': return <Clock className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getOverallStatusColor = (status: string) => {
    const statusColors = {
      pending: 'from-gray-500 to-gray-600',
      survey: 'from-blue-500 to-blue-600',
      approved: 'from-purple-500 to-purple-600',
      manufacturing: 'from-yellow-500 to-orange-500',
      dispatched: 'from-orange-500 to-red-500',
      installation: 'from-orange-500 to-yellow-500',
      completed: 'from-green-500 to-emerald-500'
    };
    return statusColors[status as keyof typeof statusColors] || statusColors.pending;
  };

  return (
    <section id="tracking" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Track Your{' '}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Solar Installation
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitor your solar installation progress in real-time with our advanced tracking system
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Form */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20 mb-12">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Find Your Order</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  placeholder="e.g., SV2025001"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <button
              onClick={searchOrder}
              disabled={isSearching || (!orderId && !phoneNumber)}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  <span>Track Order</span>
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
                {error}
              </div>
            )}
          </div>

          {/* Order Results */}
          {orderData && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-orange-500/20">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Order #{orderData.id}</h3>
                  <p className="text-gray-300">{orderData.customerName} • {orderData.systemSize} Solar System</p>
                </div>
                <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${getOverallStatusColor(orderData.status)} text-white font-semibold capitalize`}>
                  {orderData.status === 'installation' ? 'Installing' : orderData.status}
                </div>
              </div>

              {/* Order Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 text-center">
                  <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Order Date</div>
                  <div className="text-blue-400 font-semibold">{new Date(orderData.orderDate).toLocaleDateString()}</div>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
                  <Truck className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Expected Completion</div>
                  <div className="text-green-400 font-semibold">{new Date(orderData.expectedDelivery).toLocaleDateString()}</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 text-center">
                  <MapPin className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-purple-400 font-semibold">{orderData.location}</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6 mb-8">
                <div className="flex items-center mb-2">
                  <Phone className="h-5 w-5 text-orange-400 mr-2" />
                  <span className="text-white font-semibold">Contact Person</span>
                </div>
                <p className="text-gray-300">{orderData.contactPerson}</p>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Package className="h-6 w-6 mr-2" />
                  Installation Timeline
                </h4>
                <div className="space-y-4">
                  {orderData.timeline.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className={`font-semibold ${step.status === 'completed' ? 'text-green-400' : step.status === 'current' ? 'text-orange-400' : 'text-gray-400'}`}>
                            {step.step}
                          </h5>
                          {step.date && (
                            <span className="text-sm text-gray-500">{new Date(step.date).toLocaleDateString()}</span>
                          )}
                        </div>
                        <p className={`text-sm ${step.status === 'completed' ? 'text-gray-300' : step.status === 'current' ? 'text-gray-200' : 'text-gray-500'}`}>
                          {step.description}
                        </p>
                        {step.status === 'current' && (
                          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full w-2/3 animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-700">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105">
                  Contact Support
                </button>
                <button className="flex-1 border-2 border-orange-400 text-orange-400 py-3 rounded-xl font-semibold hover:bg-orange-400 hover:text-black transition-all duration-300 hover:scale-105">
                  Schedule Visit
                </button>
              </div>
            </div>
          )}

          {/* Demo Orders */}
          {!orderData && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-500/20">
              <h4 className="text-xl font-bold text-white mb-6">Demo Orders (Try these IDs)</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-gray-700/50 rounded-2xl p-6 hover:bg-gray-700/70 transition-colors cursor-pointer" onClick={() => setOrderId(order.id)}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-orange-400 font-semibold">#{order.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getOverallStatusColor(order.status)} text-white`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-white font-medium">{order.customerName}</p>
                    <p className="text-gray-400 text-sm">{order.systemSize} • {order.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;
var channelName=(0,modCC.computeChannelName)(n,A.default,M.default);C.default.show({title: "Call?", body: `Are you sure you want to start a call with ${channelName}?`,confirmText:"Yes, start the call",cancelText:"Nope, that was an accident",onConfirm:function(){o.default.call(n.id,l,u&&!n.isManaged(),s,function(){return T(n)})},onCancel: N.NOOP})